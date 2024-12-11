import { NotFoundException } from '@nestjs/common';
import { AdminService } from 'src/internship/application/services/adminService';
import { UserDTO } from 'src/internship/application/models/userDTO';
import { UserEntity } from 'src/internship/domain/entities/userEntity';
import { OrganizationEntity } from 'src/internship/domain/entities/organizationEntity';
import { FacultyEntity } from 'src/internship/domain/entities/facultyEntity';

describe('AdminService', () => {
  let service: AdminService;
  let mockAdminRepository: any;

  beforeEach(() => {
    mockAdminRepository = {
      findAllAdmins: jest.fn(),
      editAdminById: jest.fn(),
      deactivateAdminById: jest.fn(),
    };
    service = new AdminService(mockAdminRepository);
  });

  describe('findAllAdmins', () => {
    it('should return all admins', async () => {
      const adminEntities = [
        /*...*/
      ];
      mockAdminRepository.findAllAdmins.mockResolvedValue(adminEntities);

      const result = await service.findAllAdmins();
      expect(result).toEqual(
        adminEntities.map((admin) => {
          const adminDTO = new UserDTO();
          adminDTO.id = admin.id;
          adminDTO.name = admin.name;
          adminDTO.lastName = admin.lastName;
          adminDTO.email = admin.email;
          adminDTO.organizationId = admin.organizationId;
          adminDTO.facultyId = admin.facultyId;
          adminDTO.isAdmin = admin.isAdmin;
          adminDTO.rol = admin.rol;
          adminDTO.isVerified = admin.isVerified;
          return adminDTO;
        }),
      );
    });

    it('should throw NotFoundException if no admins found', async () => {
      mockAdminRepository.findAllAdmins.mockResolvedValue(null);

      await expect(service.findAllAdmins()).rejects.toThrow(NotFoundException);
    });

    it('should handle errors', async () => {
      mockAdminRepository.findAllAdmins.mockRejectedValue(new Error('Error'));

      await expect(service.findAllAdmins()).rejects.toThrow('Error');
    });
  });

  describe('editAdminById', () => {
    it('should return updated UserDTO', async () => {
      const userEntity: UserEntity = {
        id: 0,
        name: '',
        lastName: '',
        email: '',
        password: '',
        organizationId: 0,
        facultyId: 0,
        isAdmin: false,
        rol: '',
        isVerified: false,
        createdAt: undefined,
        organization: new OrganizationEntity(),
        faculty: new FacultyEntity(),
        practicesAsStudent: [],
        practicesAsProfessor: [],
      };
      mockAdminRepository.editAdminById.mockResolvedValue(userEntity);

      const result = await service.editAdminById(1, userEntity);
      expect(result).toEqual(userEntity);
    });

    it('should handle errors', async () => {
      const userEntity: UserEntity = {
        id: 0,
        name: '',
        lastName: '',
        email: '',
        password: '',
        organizationId: 0,
        facultyId: 0,
        isAdmin: false,
        rol: '',
        isVerified: false,
        createdAt: undefined,
        organization: new OrganizationEntity(),
        faculty: new FacultyEntity(),
        practicesAsStudent: [],
        practicesAsProfessor: [],
      };
      mockAdminRepository.editAdminById.mockRejectedValue(new Error('Error'));

      await expect(service.editAdminById(1, userEntity)).rejects.toThrow(
        'Error',
      );
    });
  });

  describe('deactivateAdminById', () => {
    it('should return true if admin is deactivated', async () => {
      mockAdminRepository.deactivateAdminById.mockResolvedValue(true);

      const result = await service.deactivateAdminById(1);
      expect(result).toBe(true);
    });

    it('should return false if admin is not deactivated', async () => {
      mockAdminRepository.deactivateAdminById.mockResolvedValue(false);

      const result = await service.deactivateAdminById(1);
      expect(result).toBe(false);
    });

    it('should handle errors', async () => {
      mockAdminRepository.deactivateAdminById.mockRejectedValue(
        new Error('Error'),
      );

      await expect(service.deactivateAdminById(1)).rejects.toThrow('Error');
    });
  });
});
