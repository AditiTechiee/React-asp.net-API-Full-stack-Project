.NET Core API with SQL Server - Visual Studio 2022
✅ Prerequisites
Visual Studio 2022
SQL Server
🔹 1. Create the Project
Open Visual Studio 2022
Create a new project → Select ASP.NET Core Web API
Name it: EMS
🔹 2. Install NuGet Packages
Microsoft.EntityFrameworkCore
Microsoft.EntityFrameworkCore.SqlServer
Microsoft.EntityFrameworkCore.Tools
🔹 3. Create the Model
Models/Employee.cs

public class Employee
{
	public int Id { get; set; }
	public string Name { get; set; }
	public string Position { get; set; }
	public decimal Salary { get; set; }
}
🔹 4. Create the DbContext
Models/ApplicationDbContext.cs

public class ApplicationDbContext : DbContext
{
	public AppDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
	public DbSet<Employee> Employees { get; set; }
}
🔹 5. Configure Connection String
appsettings.json

"ConnectionStrings": {
"DefaultConnection": "Server=servername;Database=EMS;Trusted_Connection=True;TrustServerCertificate=True;Encrypt=False"
}
🔹 6. Register DbContext
Program.cs

builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
🔹 7. Run EF Core Migrations
Open Package Manager Console and run:

Add-Migration InitialCreate
Update-Database
🔹 8. Create the Controller
[Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            return Ok(_context.Employee.ToList());
        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            return Ok(_context.Employee.Find(id));
        }

        [HttpPost]
        public IActionResult AddEmployee(Employee employee)
        {
            _context.Employee.Add(employee);
            _context.SaveChanges();
            return Ok("Employee added successfully!");
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(Employee employee)
        {
            _context.Employee.Update(employee);
            _context.SaveChanges();
            return Ok("Employee updated successfully!");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _context.Employee.Find(id);
            _context.Employee.Remove(employee);
            _context.SaveChanges();
            return Ok("Employee deleted successfully!");
        }
    }
