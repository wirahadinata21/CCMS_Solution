using CCMS.Student.API.Data;
using CCMS.Student.API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// 1. Tambahkan Policy CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173") // Port default Vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// 1. Koneksi Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StudentDbContext>(options =>
    options.UseSqlServer(connectionString));

//builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Menangani camelCase agar sesuai dengan input dari React/Swagger
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
builder.Services.AddScoped<IStudentService, StudentService>();
// 2. Swagger Configuration (Garis merah akan hilang setelah install package di atas)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 3. Aktifkan Swagger UI di Mode Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CCMS Student API V1");
    });
}
// 2. Aktifkan CORS (Harus di atas UseAuthorization)
app.UseCors("AllowReact");
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();