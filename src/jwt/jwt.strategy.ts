import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '0nLzg@D#k$4^zN!p8yT1c7X&bFsJd9vL', // Match the key in JwtModule
    });
  }

  async validate(payload: any) {
    console.log('Payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
