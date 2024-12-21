import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ArafatService } from './arafat.service';
import { UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('/control')
export class ArafatController {
    constructor(private readonly arafatService: ArafatService) {}

    @Post('/register')
    async register(@Body() data) {
        try {
            if (data.userType === "admin") {
                throw new Error('Access Denied : Admin access required to user this end point');;
            }
            return await this.arafatService.registerUser(data);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Post('/login')
    async login(@Body() body) {
        try {
            return await this.arafatService.loginUser(body.email, body.password);
        } catch (error) {
            return { message: error.message };
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.arafatService.blacklistToken(token);
    }
  
    @Get('/protected')
    @UseGuards(AuthGuard('jwt'))
    async getProtectedData(@Request() req) {
        try {
            const user = await this.arafatService.getUserById(req.user.userId);
            return {
            message: 'This is protected',
            user: {
                userId: user.userId,
                email: user.email,
                userType: user.userType,
            },
            };
        } catch (error) {
            return { message: error.message };
        }
    }
  
    // ==========================================
    // ============    chat    ==================
    // ==========================================
  
    @Post('/createticket')
    @UseGuards(AuthGuard('jwt'))
    async createTicket(@Request() req) {
        try {
            return await this.arafatService.createTicket(req.user.userId);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Get('/usertickets')
    @UseGuards(AuthGuard('jwt'))
    async userTickets(@Request() req) {
        try {
            return await this.arafatService.userTickets(req.user.userId);

        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Get('/activeticket')
    @UseGuards(AuthGuard('jwt'))
    async getAllOpenticket(@Request() req) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point');
            }
            return await this.arafatService.getAllOpenticket();
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Get('/ticketchat/:id')
    @UseGuards(AuthGuard('jwt'))
    async getTicketChat(@Param('id') id) {
        try {
            return await this.arafatService.getTicketChat(id);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Patch('/updateticket/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateticket(@Param('id') id) {
        try {
            const data = { status: 'close' };
            return await this.arafatService.updateticket(id, data);
        } catch (error) {
            return { message: error.message };
        }
    }

    @Post('/sendmessage')
    @UseGuards(AuthGuard('jwt'))
    async sendMessage(@Request() req, @Body() data) {
        try {
            return await this.arafatService.sendMessage(req.user.userId,data.ticketId,data.message);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    // ==========================================
    // ============    overview    ==============
    // ==========================================
  
    @Get('/overviewdata')
    @UseGuards(AuthGuard('jwt'))
    async overviewData(@Request() req) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point');
            }
            return await this.arafatService.overviewData();
        } catch (error) {
            return { message: error.message };
        }
    }
  
    // ==========================================
    // ============    property    ==============
    // ==========================================
  
    @Get('/allproperty')
    @UseGuards(AuthGuard('jwt'))
    async getAllproperty(@Request() req) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point');
            }
            return await this.arafatService.getAllproperty();
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Get('/allproperty/:id')
    @UseGuards(AuthGuard('jwt'))
    async getproperty(@Request() req,@Param('id') id) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point');
            }
            return await this.arafatService.getproperty(id);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Patch('/allproperty/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateProperty(@Request() req,@Param('id') id, @Body() data) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point');
            }
            return await this.arafatService.updateProperty(id, data);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    // ==========================================
    // ============    user    ==================
    // ==========================================
  
    // @Get('/alluser')
    // async getAllUser() {
    //   try {
    //     return await this.arafatService.getAllUser();
    //   } catch (error) {
    //     return { message: error.message };
    //   }
    // }
  
    @Get('/alluser')
    @UseGuards(AuthGuard('jwt'))
    async getUserbyserch(@Request() req,@Query('search') search: string) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point.');
            }
            return await this.arafatService.getUserbyserch(search);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Post('/adminadduser')
    @UseGuards(AuthGuard('jwt'))
    async addUser(@Request() req,@Body() data) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point.');
            }
            return await this.arafatService.adduser(data);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Get('/alluser/:id')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Request() req,@Param('id') id) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied : Admin access required to user this end point.');
            }
            return await this.arafatService.getUser(id);
        } catch (error) {
            return { message: error.message };
        }
    }
  
    @Patch('/alluser/:id')
    @UseGuards(AuthGuard('jwt'))
    async updateuser(@Request() req, @Param('id') id, @Body() data) {
        try {
            if (req.user.userType !== 'admin') {
                throw new Error('Access Denied: Admin access required to use this endpoint.');
            }
            if (data.userId) {
                throw new Error('Request Declined: User ID cannot be changed for unique identity.');
            }
            // Validate email
            if (data.email) {
                const user = await this.arafatService.getUser(id);
                if(user.email !== data.email){
                    const existingUser = await this.arafatService.findUserByEmail(data.email);
                    if (existingUser) {
                        throw new Error('Request Declined: Email is already in use.');
                    }
                }
            }

            return await this.arafatService.updateuser(id, data);
        } catch (error) {
            return { message: error.message };
        }
    }

  
    @Delete('/alluser/:id')
    @UseGuards(AuthGuard('jwt'))
    async deleteuser(@Request() req,@Param('id') id) {
      try {
        if (req.user.userType !== 'admin') {
            throw new Error('Access Denied: Admin access required to use this endpoint.');
        }
        const user = await this.arafatService.getUser(id);
        if(user.userType === "admin"){
            throw new Error('Request Declined: User cannot Delete.');
        }

        return await this.arafatService.deleteuser(id);
      } catch (error) {
        return { message: error.message };
      }
    }
}
