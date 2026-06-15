import { IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateTenantDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  name!: string;

  // Optional URL-safe slug; generated from the name if omitted.
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "slug must be lowercase letters, numbers, and single hyphens",
  })
  slug?: string;
}
