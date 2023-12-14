import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  /**
   * session ID
   */
  @PrimaryColumn()
  id: string;

  /**
   * UNIX timestamp
   */
  @Column()
  expiresAt: number;

  /**
   * JSON data
   */
  @Column()
  data: string;
}
