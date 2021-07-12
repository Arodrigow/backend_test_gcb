import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiQuery, ApiOperation } from "@nestjs/swagger"
import { DoctorService } from './doctor.service';
import { SaveDoctorDto } from './dto/save-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@ApiTags('Doctors')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }


  @ApiOperation({ summary: "[CreateDoctor] Used to create a new doctor." })
  @ApiResponse({ status: 201, description: 'A doctor has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Could be trying to create an doctor that already exists or a validation exception.' })
  @Post()
  async create(@Body() saveDoctorDto: SaveDoctorDto) {
    return await this.doctorService.create(saveDoctorDto);
  }


  @ApiOperation({
    summary: `[FindDoctor] Used to get a doctor registred in the database. 
  (Doctor's IDs can found using [ListAll] route).` })
  @ApiResponse({ status: 200, description: 'A doctor has been found.' })
  @ApiResponse({ status: 404, description: "Requested doctor does not exist" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }
  @ApiOperation({
    summary: `[ListAll] Used to get all doctors (Response is in its raw format).`
  })
  @ApiResponse({ status: 200, description: 'Successfully listed all doctors.' })
  @Get()
  listAll() {
    return this.doctorService.listAll();
  }

  @Get('search/q')
  @ApiOperation({
    summary: `[Search] Used to search through the database using specified queries.`
  })
  @ApiResponse({ status: 200, description: 'Search successfull.' })
  @ApiQuery({ name: "name", required: false })
  @ApiQuery({ name: "crm", required: false })
  @ApiQuery({ name: "landline_phone", required: false })
  @ApiQuery({ name: "mobile_phone", required: false })
  @ApiQuery({ name: "cep", required: false })
  @ApiQuery({ name: "end", required: false })
  @ApiQuery({ name: "bairro", required: false })
  @ApiQuery({ name: "cidade", required: false })
  @ApiQuery({ name: "uf", required: false })
  @ApiQuery({ name: "specialty", required: false })
  search(@Query() params) {
    return this.doctorService.search(params);
  }

  @ApiOperation({
    summary: `[UpdateDoctor] Used to update an existing doctor.`
  })
  @ApiResponse({ status: 200, description: 'A doctor has been updated.' })
  @ApiResponse({ status: 400, description: "Validation error" })
  @ApiResponse({ status: 404, description: "Requested doctor does not exist" })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return await this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[DeleteDoctor] Used to softdelete an existing doctor.`
  })
  @ApiResponse({ status: 200, description: 'A doctor has been deleted.' })
  @ApiResponse({ status: 404, description: "Requested doctor does not exist" })
  async remove(@Param('id') id: string) {
    return await this.doctorService.remove(id);
  }


  @Patch('recover/:id')
  @ApiOperation({
    summary: `[RecoverDoctor] Used to recover softdeleted doctors.`
  })
  @ApiResponse({ status: 200, description: 'A doctor has been recovered.' })
  @ApiResponse({ status: 404, description: "Requested doctor does not exist" })
  async recover(@Param('id') id: string) {
    return await this.doctorService.recover(id);
  }
}
