import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { SaveDoctorDto } from './dto/save-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  async create(@Body() saveDoctorDto: SaveDoctorDto) {
    return await this.doctorService.create(saveDoctorDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Get('search/q')
  search(@Query() params) {
    return this.doctorService.search(params);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.doctorService.remove(id);
  }
  @Patch('recover/:id')
  async recover(@Param('id') id: string) {
    return await this.doctorService.recover(id);
  }
}
