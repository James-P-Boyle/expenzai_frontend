import { MetadataRoute } from 'next'

const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.expenzai.app' 
    : 'http://localhost:3002'

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString()
    
    return [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        
        {
            url: `${baseUrl}/auth/login`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/auth/register`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        
        // Dashboard pages (for SEO purposes, though protected)
        {
            url: `${baseUrl}/dashboard`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/dashboard/upload`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/dashboard/analytics`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        
        // Legal pages
        {
            url: `${baseUrl}/privacy`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/cookies`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/gdpr`,
            lastModified: currentDate,
            changeFrequency: 'yearly',
            priority: 0.5,
        },
    ]
}