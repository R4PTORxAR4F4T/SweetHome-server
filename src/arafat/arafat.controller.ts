import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ArafatService } from './arafat.service';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('/control')
export class ArafatController {
    constructor(private readonly arafatService: ArafatService) {}

    // ==========================================
    // ============    login    =================
    // ==========================================

    @Post('/register')
    async register(@Body() data) {
        return this.arafatService.registerUser(data);
    }
    //{"userName": "testuser","password": "password123","email": "testuser@example.com"}


    @Post('/login')
    async login(@Body() body) {
        return this.arafatService.loginUser(body.email, body.password);
    }
    // {"email": "testuser@example.com","password": "password123"}

    @Get('/protected')
    @UseGuards(AuthGuard('jwt'))
    getProtectedData(@Request() req) {
        return { message: 'This is protected', user: req.user };
    }

    // ==========================================
    // ============    chat    ==================
    // ==========================================

    @Post("/createticket")
    async createTicket(@Body() data ){
        try {
            return await this.arafatService.createTicket(data);
        }
        catch (error) {
            return { message: error.message };
        }
    }

    @Get('/usertickets')
    async userTickets(@Query('userId') userId: number) {
        return await this.arafatService.userTickets(userId);
    }

    @Get('/activeticket')
    async getAllOpenticket(){
        return await this.arafatService.getAllOpenticket();
    }

    @Get('/ticketchat/:id')
    async getTicketChat(@Param('id') id){
        return await this.arafatService.getTicketChat(id);
    }

    @Patch("/updateticket/:id")
    updateticket(@Param('id') id ){
        const data = { status: "close" };
        return this.arafatService.updateticket (id,data);
    }


    // ==========================================
    // ============    overview    ==============
    // ==========================================

    @Get('/overviewdata')
    async overviewData() {
        return await this.arafatService.overviewData();
    }
    

    

    // ==========================================
    // ============    property    ==============
    // ==========================================

    @Get('/allproperty')
    getAllproperty(){
        return this.arafatService.getAllproperty();
    }

    @Get('/allproperty/:id')
    getproperty(@Param('id') id){
        return this.arafatService.getproperty(id);
    }

    @Patch("/allproperty/:id")
    updateProperty(@Param('id') id, @Body() data){
        return this.arafatService.updateProperty(id , data);
    }
    



    // ==========================================
    // ============    user    ==================
    // ==========================================

    @Get('/alluser')
    getAllUser(){
        return this.arafatService.getAllUser();
    }

    // fetch data with search input intigrated
    // @Get('/alluser')
    // getAllUser(@Query('search') search: string) {
    //     return this.arafatService.getAllUser(search);
    // }

    @Post("/alluser")
    addUser(@Body() data){
        return this.arafatService.adduser(data);
    }

    @Get('/alluser/:id')
    getUser(@Param('id') id){
        return this.arafatService.getUser(id);
    }

    @Patch("/alluser/:id")
    updateuser(@Param('id') id, @Body() data){
        return this.arafatService.updateuser(id , data);
    }

    @Delete("/alluser/:id")
    deleteuser(@Param('id') id){
        return this.arafatService.deleteuser(id);
    }
}
