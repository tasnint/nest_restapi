import { Body, Controller, Get, Post, Patch, Param, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';

import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users') //will handle the users route and will have /users at the end
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    /*
    GET /users want to return all the users       
    GET /users/:id getting one user
    POST /users  creating new user
    PATCH /users:id  to change one thing about the user and the id is needed to identify which user we want to patch
    DELETE /users:id id needed for user we want to delete     
    */

    @Get() //GET /users to get all users or users/?role=value which handles query
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN' | 'STUDENT'){
        return this.usersService.findAll(role)
    }

    @Get(':id') //GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id)
    }

    @Post() //POST /users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Patch(':id') //PATCH /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto)
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number){
        return this.usersService.delete(id)
    }



}
