import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menus')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get()
    async getMenus(
        @Query('page') page: number,
        @Query('itemsPerPage') itemsPerPage: number
    ) {
        return this.menuService.getMenus(Number(page) || 1, Number(itemsPerPage) || 10);
    }

    @Get(':id')
    async getMenu(@Param('id') id: string) {
        return this.menuService.getMenuById(id);
    }

    @Post()
    async createMenu(@Body() dto: CreateMenuDto) {
        return this.menuService.addMenuItem(dto);
    }

    @Put(':id')
    async updateMenu(@Param('id') id: string, @Body() dto: UpdateMenuDto) {
        return this.menuService.updateMenu(id, dto);
    }

    @Delete(':id')
    async deleteMenu(@Param('id') id: string) {
        return this.menuService.deleteMenu(id);
    }
}
