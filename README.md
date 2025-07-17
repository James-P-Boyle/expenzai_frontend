# Expenzai

An AI-powered expense tracking app that automatically categorizes your receipts using computer vision. Simply take a photo of your receipt and let AI handle the rest!

## Features

- 📸 **Camera Integration** - Take photos directly from your phone or upload existing images
- 🤖 **AI Processing** - OpenAI GPT-4 Vision automatically extracts items and categorizes them
- 📊 **Smart Analytics** - Weekly spending summaries with interactive charts
- ✏️ **Manual Editing** - Review and edit AI categorizations for accuracy
- 📱 **Mobile Responsive** - Works seamlessly on desktop and mobile devices
- 🔐 **Secure Authentication** - User accounts with protected data

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Interactive data visualizations
- **Lucide React** - Beautiful icons

### Backend
- **Laravel 12** - PHP API framework
- **Sanctum** - API authentication
- **MySQL** - Database
- **Queue Jobs** - Background AI processing

### AI & Services
- **OpenAI GPT-4 Vision** - Receipt text extraction and categorization
- **Laravel HTTP Client** - API communication

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- PHP 8.2+ and Composer
- MySQL database
- OpenAI API key

### Frontend Setup

```bash
# Clone and install dependencies
git clone <your-repo>
cd receipt-tracker-frontend
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://receipt-tracker-api.test/api
NEXT_PUBLIC_APP_NAME=Receipt Tracker
```

```bash
# Run the development server
npm run dev
```

### Backend Setup

```bash
# Navigate to your Laravel API project
cd receipt-tracker-api

# Install dependencies
composer install

# Set up environment
cp .env.example .env
php artisan key:generate
```

Edit `.env`:
```bash
DB_CONNECTION=mysql
DB_DATABASE=receipt_tracker_api
OPENAI_API_KEY=your_openai_api_key_here
QUEUE_CONNECTION=database
```

```bash
# Set up database
php artisan migrate
php artisan queue:table
php artisan migrate
php artisan storage:link

# Start services
php artisan serve  # Terminal 1
php artisan queue:work  # Terminal 2
```

## Usage

1. **Register/Login** - Create an account or sign in
2. **Upload Receipt** - Take a photo or upload an image of your receipt
3. **AI Processing** - Wait 15-30 seconds for AI to extract and categorize items
4. **Review Results** - Check the categorized items and edit any uncertain ones
5. **View Analytics** - See your weekly spending patterns and insights

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Receipts
- `GET /api/receipts` - List user receipts
- `POST /api/receipts` - Upload new receipt
- `GET /api/receipts/{id}` - Get receipt details
- `DELETE /api/receipts/{id}` - Delete receipt

### Categories & Analytics
- `PUT /api/items/{id}` - Update item category
- `GET /api/expenses/weekly` - Weekly summary
- `GET /api/expenses/summary` - Monthly overview

## Development

### File Structure
```
receipt-tracker-frontend/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Main app pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── camera/           # Camera functionality
│   └── receipts/         # Receipt components
├── lib/                  # Utilities
│   ├── api.ts           # API client
│   └── types.ts         # TypeScript definitions
└── context/              # React Context providers
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://your-api-url/api
NEXT_PUBLIC_APP_NAME=Receipt Tracker
```

### Backend (.env)
```bash
OPENAI_API_KEY=your_openai_api_key
DB_CONNECTION=mysql
QUEUE_CONNECTION=database
FILESYSTEM_DISK=public
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for GPT-4 Vision API
- Laravel and Next.js communities
- Tailwind CSS for beautiful styling
- Recharts for data visualization