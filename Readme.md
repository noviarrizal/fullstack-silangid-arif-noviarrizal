# How To Run Server(Backend) Application

This repository contains the skeleton application for the Laravel framework, providing a base for new Laravel projects. It includes all the essential packages and configurations needed to get started with Laravel.

## Requirements

- PHP >= 8.2
- Laravel Framework >= 12.0
- Other dependencies as listed in `composer.json`

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/laravel-laravel.git
cd laravel-laravel
```

### 2. Install Dependencies
run in the terminal 
```bash
cd server
```
```bash
composer install
```

### 3. Set Up Environment Configuration
don't forget to add .env based on your database and environment setup
```bash
cp .env.example .env
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Run Migrations
```bash
php artisan migrate
```

### 6. Start the Development Server
```bash
php artisan serve
```

# How To Run Client(Frontend) Application

This is a React-based frontend application for the project. It is set up with modern tools like Vite, TailwindCSS, and TypeScript, as well as various libraries for state management, form handling, and animations.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

## Installation

### 1. Install Dependencies
run in the terminal 
```bash
cd client
```
```bash
run npm install
```
```bash
npm run dev
```


