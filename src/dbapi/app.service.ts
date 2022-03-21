import { Injectable } from '@nestjs/common';
import { News } from './database/entities/news.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async getNewsAll(): Promise<News[]> {
    const posts = this.newsRepository.find();
    return posts;
  }

  async getNewsOne(id: number): Promise<News | null> {
    return this.newsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createNews(data: News): Promise<News> {
    return this.newsRepository.save(data);
  }

  async updateNews(data: News): Promise<News> {
    const existingPost = await this.newsRepository.findOne({
      where: {
        id: data.id,
      },
    });
    return this.newsRepository.save({
      ...existingPost,
      ...data,
    });
  }

  async deleteNewsOne(id: number): Promise<News> {
    const post = await this.newsRepository.findOne({
      where: {
        id,
      },
    });
    if (post) return this.newsRepository.remove(post);
    else throw new Error('Post not found');
  }
}
