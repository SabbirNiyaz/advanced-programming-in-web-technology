import { Injectable } from "@nestjs/common"
import { AdminDTO } from "./admin.dto"

@Injectable()
export class AdminService {
    getHello(): object {
        return {
            message: "Hello NestJS!!"
        }
    }
    getAdminById(id: number): object {
        return {
            id: id,
            message: "Hello NestJS!!"
        }
    }
    queryByNameId(name: string, id: number): object {
        return {
            id: id,
            name: name
        }
    }
    createAdmin(myObj: AdminDTO): object {
        return {
            data: myObj
        }
    }
}
