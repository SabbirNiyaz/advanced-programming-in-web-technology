import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminDTO } from "./admin.dto";
@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Get('admin')
    getHello(): object {
        return this.adminService.getHello();
    }

    @Get('find/:id')
    getAdminById(@Param('id') id: number): object {
        console.log(id);
        console.log(typeof (id));
        return this.adminService.getAdminById(id);
    }

    @Get('admin/search')
    queryByNameId(@Query('name') name: string, @Query('id', ParseIntPipe) id: number): object {
        console.log(typeof (id))
        return this.adminService.queryByNameId(name, id);
    }

    @Post('create')
    createAdmin(@Body() myObj: AdminDTO) {
        return this.adminService.createAdmin(myObj)
    }
}
