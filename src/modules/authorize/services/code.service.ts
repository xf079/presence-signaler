import { Injectable } from '@nestjs/common';
// import { MailerService } from '@nestjs-modules/mailer';
import ApiException from '@/common/exceptions/api.exception';
import { PrismaService } from '@/shared/prisma/prisma.service';
import { CacheService } from '@/shared/cache/cache.service';
import { CreateSmsCodeDto } from '../dto/authorize-req.dto';

@Injectable()
export class CodeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
    // private readonly mailService: MailerService,
  ) {}

  /**
   * 发送邮箱验证码
   * @param type 类型
   * @param email 邮箱
   * @returns 是否发送成功
   */
  async send(data: CreateSmsCodeDto) {
    const { type, email } = data;
    const expire = await this.cache.get<string>(`code_${type}_expire_${email}`);
    if (expire) {
      throw new ApiException(`500:操作过于频繁，请稍后再试`);
    }
    const code = Math.random().toString().slice(-6);
    await this.cache.set<string>(`code_${type}_${email}`, code, '1h');
    await this.cache.set<string>(`code_${type}_expire_${email}`, email, '120s');
    // await this.mailService.sendMail({
    //   to: email,
    //   subject: 'SecureIt Register Code',
    //   template: 'validate.code.ejs',
    //   context: {
    //     code,
    //   },
    // });

    return code;
  }

  /**
   * 验证邮箱验证码
   * @param type
   * @param email
   * @param code 验证码
   * @returns 是否验证成功
   */
  async validateCode(type: string, email: string, code: string) {
    const cacheCode = await this.cache.get<string>(`code_${type}_${email}`);

    return cacheCode === code;
  }
}
