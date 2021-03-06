import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  @ApiBody({ type: User })
  @ApiCreatedResponse({ description: "Min Length - 4      Max Length - 20" })
  signup(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
  ): Promise<void> {
    return this.authService.signup(authCredentialsDto);
  }

  @Post("/signin")
  @ApiBody({ type: User })
  @ApiCreatedResponse({ description: "User SignIn" })
  signin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signIn(authCredentialsDto);
  }
}
