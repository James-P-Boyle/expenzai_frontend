import { MetadataRoute } from 'next'

const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.expenzai.app' 
    : 'http://localhost:3002'

export default function robots(): MetadataRoute.Robots {

    if (process.env.NODE_ENV !== 'production') {
        return {
            rules: {
                userAgent: '*',
                disallow: '/',
            },
        }
    }

    // Production robots.txt
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/dashboard/*',     // Protected user areas
                    '/api/*',           // API endpoints
                    '/_next/*',         // Next.js internal files
                    '/admin/*',         // Admin areas if you have any
                    '/private/*',       // Any private sections
                    '/temp/*',          // Temporary files
                    '/*.json$',         // JSON files
                    '/*.xml$',          // XML files (except sitemap)
                ],
            },
            {
                userAgent: 'GPTBot',    // OpenAI's web crawler
                disallow: '/',          // Prevent AI training on your content
            },
            {
                userAgent: 'Google-Extended',  // Google's AI training crawler
                disallow: '/',                 // Prevent AI training on your content
            },
            {
                userAgent: 'CCBot',     // Common Crawl (used by AI)
                disallow: '/',          // Prevent AI training on your content
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}