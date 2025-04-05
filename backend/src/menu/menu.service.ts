import { ConflictException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Prisma } from '@prisma/client';
import { PaginatedResponseDto } from 'src/common/dto/paginated-response.dto';
import { CrudResponseDto } from 'src/common/dto/crud-response.dto';

@Injectable()
export class MenuService {
    constructor(private prisma: PrismaService) { }

    async getMenuWithChildren(id: string) {
        const menu = await this.prisma.menu.findUnique({
            where: { id },    
            //here is what i need to test
            include: { children: true },
        });
        if (!menu) return null;

        const children = await Promise.all(
            menu.children.map(async (child) => await this.getMenuWithChildren(child.id))
        );

        return { ...menu, children };
    }
    async getMenus(page: number, itemsPerPage: number) {
        const skip = (page - 1) * itemsPerPage;

        const [menus, totalRecords] = await this.prisma.$transaction([
            this.prisma.menu.findMany({ where: { parentId: null }, skip, take: itemsPerPage }),
            this.prisma.menu.count(),
        ]);

        const data = await Promise.all(menus.map(async (menu) => await this.getMenuWithChildren(menu.id)));

        return new PaginatedResponseDto(data, totalRecords, itemsPerPage, page);
    }

    async getMenuById(id: string) {
        const menu = await this.getMenuWithChildren(id);

        if (!menu) throw new NotFoundException('Menu not found');

        return menu;

    }

    async addMenuItem(dto: CreateMenuDto) {
        try {

            if (dto.parentId) {
                const parent = await this.prisma.menu.findUnique({
                    where: { id: dto.parentId },
                });
                if (!parent) throw new NotFoundException('Parent menu not found');
            }

            const depth = dto.parentId
                ? (await this.prisma.menu.findUnique({ where: { id: dto.parentId } })).depth + 1
                : 0;

            const menu = await this.prisma.menu.create({
                data: {
                    name: dto.name,
                    parentId: dto.parentId,
                    depth,
                },
            });

            return new CrudResponseDto(true, 'Menu item created successfully', menu);

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Menu item already exists');
                }
            }
            throw error;
        }

    }

    async updateMenu(id: string, dto: UpdateMenuDto) {
        try {
            const menu = await this.prisma.menu.findUnique({ where: { id } });
            if (!menu) throw new NotFoundException('Menu not found');

            const updated = await this.prisma.menu.update({
                where: { id },
                data: { name: dto.name },
            });

            return new CrudResponseDto(true, 'Menu item updated successfully', updated);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Menu name must be unique');
                }
            }
            throw error;

        }
    }

    async deleteMenu(id: string) {
        try {
            const menu = await this.prisma.menu.findUnique({ where: { id } });
            if (!menu) throw new NotFoundException('Menu not found');

            await this.prisma.menu.deleteMany({ where: { parentId: id } });
            await this.prisma.menu.delete({ where: { id } });
            return new CrudResponseDto(true, 'Menu item deleted successfully', menu);


        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Menu name must be unique');
                }
            }
            throw error;
        }
    }
}
