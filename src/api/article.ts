import request from './base';

interface Article {
    id: number
    title: string
    createTime: number
    updateTime: number
    description: string
    imgSrc: string|null
}

interface ArticleContent {
    chat: string,
    content: string|null
}

export const getArticlePaged = (page: number, pageSize: number) => {
    return request.get<Article[]>('/articles', {
        params: { page }
    });
    // {
    //     id: number
    //     title: string
    //     createTime: number
    //     updateTime: number
    //     description: string
    //     imgSrc: string|null
    // }
}

export const getArticleContent = (articleId: number, page: number, pageSize: number) => {
    return request.get<ArticleContent[]>(`/article/${articleId}`, {
        params: { page, pageSize }
    });
    // [
    //     {
    //         chat: '这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章这是你的第一篇测试文章',
    //         content: null|string|$content$
    //     }
    // ]
}