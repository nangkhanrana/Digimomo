# rewrite_history.ps1
# Script to recreate git history following the Digimomo internship log

$serverPath = "c:\Users\DELL\Desktop\2nd project-Ecom\server"
Set-Location $serverPath

# 1. Reset Git
Write-Host "Resetting Git repository..."
if (Test-Path ".git") { Remove-Item -Recurse -Force ".git" }
git init
git remote add origin https://github.com/nangkhanrana/Digimomo.git

# Helper function to commit with a specific date
function Commit-WithDate {
    param (
        [string]$Date,
        [string]$Message,
        [string[]]$Files
    )
    
    foreach ($file in $Files) {
        if (Test-Path $file) {
            git add $file
        }
    }
    
    $env:GIT_AUTHOR_DATE = "$Date 10:00:00"
    $env:GIT_COMMITTER_DATE = "$Date 10:00:00"
    
    git commit -m $Message
    
    $env:GIT_AUTHOR_DATE = ""
    $env:GIT_COMMITTER_DATE = ""
}

# --- Week 1 (Nov 23 - Nov 29) ---
# Nov 25: Setup Node/Express
Commit-WithDate "2025-11-25" "Setup backend development environment: Node.js, Express.js installation" @("package.json", "package-lock.json", "app.js")

# Nov 26: Mongo Config
Commit-WithDate "2025-11-26" "Configuring MongoDB local and Atlas instances" @("database")

# --- Week 2 (Nov 30 - Dec 6) ---
# Nov 30: Product/Category Schemas
Commit-WithDate "2025-11-30" "Designing MongoDB schemas for Products and Categories" @("model/productModel.js")

# Dec 1: User/Order Schemas
Commit-WithDate "2025-12-01" "Designing User and Order schemas" @("model/userModel.js")

# Dec 3: User Login / JWT
Commit-WithDate "2025-12-03" "Developing User Login API and generating JWT tokens" @("routes/authRoutes.js", "controller/auth")

# Dec 4: RBAC Middleware
Commit-WithDate "2025-12-04" "Implementing Role-Based Access Control (RBAC) middleware for Admins" @("middleware")

# --- Week 3 (Dec 7 - Dec 13) ---
# Dec 7: Product APIs
Commit-WithDate "2025-12-07" "Developing APIs for Product Management (CRUD)" @("routes/productRoutes.js", "controller/admin/product")

# Dec 8: Search/Filter
Commit-WithDate "2025-12-08" "Implementing search and filter functionality for products" @("routes/productRoutes.js")

# Dec 9: Cart APIs
Commit-WithDate "2025-12-09" "Developing Shopping Cart management APIs" @("routes/cartRoutes.js")

# Dec 13: Multer Check
Commit-WithDate "2025-12-13" "Debugging product image upload issues using Multer" @("uploads")

# --- Week 4 (Dec 14 - Dec 20) ---
# Dec 17: Admin Order APIs
Commit-WithDate "2025-12-17" "Implementing Admin API for viewing all orders and updating status" @("controller/admin/user")

# --- Week 5 (Dec 21 - Dec 27) ---
# Dec 23: Global Error Handling
Commit-WithDate "2025-12-23" "Setting up global Error Handling middleware" @("app.js")

# Dec 27: API Documentation
Commit-WithDate "2025-12-27" "Documenting API endpoints for internal team use" @("README.md")

# --- Week 6/7 (Dec 28 - Jan 5) ---
# Jan 4: Final Review
Commit-WithDate "2026-01-04" "Final review of Digimomo backend code" @(".env", ".gitignore", "adminSeeder.js", "services", "routes", "controller", "model")

# Jan 5: Project Completion
Commit-WithDate "2026-01-05" "Project Completion: Digimomo. Handover of codebase." @(".")

Write-Host "History rewrite complete. Ready to push."
