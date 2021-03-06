import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('specialties')
@Controller('specialties')
export class SpecialtiesController {
  constructor(private readonly specialtiesService: SpecialtiesService) { }

  @Post()
  @ApiOperation({
    summary: `[CreateSpecialty] Used to create a new specialty.`
  })
  @ApiResponse({ status: 201, description: 'A specialty has been created.' })
  @ApiResponse({ status: 400, description: "Requested specialty already exist." })
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtiesService.create(createSpecialtyDto);
  }

  @Get()
  @ApiOperation({
    summary: `[ListAll] Used to list all specialties 
    [There are already seeded specialties in the database].`
  })
  @ApiResponse({ status: 200, description: 'Successfully listed all specialties.' })
  list() {
    return this.specialtiesService.findAll();
  }

  @Delete(':id')
  @ApiOperation({
    summary: `[DeleteSpecialty] Used to delete a specialty.`
  })
  @ApiResponse({ status: 200, description: 'Successfully deleted a specialty.' })
  @ApiResponse({ status: 400, description: "Requested specialty does not exist." })
  remove(@Param('id') id: string) {
    return this.specialtiesService.remove(id);
  }
}
