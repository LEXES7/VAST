import { PartialType } from "@nestjs/mapped-types";
import { CreateContactDto } from "./create-contact.dto";

// All fields optional for updates; same validation rules otherwise.
export class UpdateContactDto extends PartialType(CreateContactDto) {}
