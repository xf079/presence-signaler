import * as bcrypt from 'bcrypt';

/**
 * 密码加密结果接口
 */
export interface PasswordHashResult {
  /**
   * 加密后的密码
   */
  hash: string;
  /**
   * 盐值
   */
  salt: string;
}

/**
 * 密码工具类
 */
export class PasswordUtil {
  /**
   * 默认的盐轮数
   */
  private static readonly DEFAULT_SALT_ROUNDS = 10;

  /**
   * 生成盐值
   * @param saltRounds 盐轮数，默认为10
   * @returns 生成的盐值
   */
  static async generateSalt(saltRounds = this.DEFAULT_SALT_ROUNDS) {
    return bcrypt.genSalt(saltRounds);
  }

  /**
   * 使用指定盐值加密密码
   * @param password 明文密码
   * @param salt 盐值
   * @returns 加密后的密码
   */
  static async hashWithSalt(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  /**
   * 加密密码并返回盐值
   * @param password 明文密码
   * @param saltRounds 盐轮数，默认为10
   * @returns 加密结果，包含加密后的密码和盐值
   */
  static async hashWithSaltResult(
    password: string,
    saltRounds = this.DEFAULT_SALT_ROUNDS,
  ): Promise<PasswordHashResult> {
    const salt = await this.generateSalt(saltRounds);
    const hash = await this.hashWithSalt(password, salt);
    return { hash, salt };
  }

  /**
   * 加密密码
   * @param password 明文密码
   * @param saltRounds 盐轮数，默认为10
   * @returns 加密后的密码
   */
  static async hash(
    password: string,
    saltRounds = this.DEFAULT_SALT_ROUNDS,
  ): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * 验证密码
   * @param password 明文密码
   * @param hashedPassword 加密后的密码
   * @returns 是否匹配
   */
  static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * 使用指定盐值验证密码
   * @param password {string} 明文密码
   * @param hashedPassword {string} 加密后的密码
   * @param salt {string} 盐值
   * @returns 是否匹配
   */
  static async compareWithSalt(
    password: string,
    hashedPassword: string,
    salt: string,
  ): Promise<boolean> {
    const hash = await this.hashWithSalt(password, salt);
    return hash === hashedPassword;
  }
}
