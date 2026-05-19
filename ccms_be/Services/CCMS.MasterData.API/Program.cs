using CCMS.MasterData.API.Data;
using CCMS.MasterData.API.Repository;
using CCMS.MasterData.API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Tambahkan Policy CORS (Disamakan dengan Student.API)
builder.Services.AddCors(options => {
    options.AddPolicy("AllowReact", policy => {
        policy.WithOrigins("http://localhost:5173") // Port default Vite
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 2. Koneksi Database Master Data
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//builder.Services.AddDbContext<MasterDataContext>(options =>
//    options.UseSqlServer(connectionString));
builder.Services.AddDbContext<MasterDataContext>(options => 
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 3. Konfigurasi Controller & JSON Options
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });

// 4. Registrasi AutoMapper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// 5. Registrasi Service & Repository (DI)
builder.Services.AddScoped<IReferenceRepository, ReferenceRepository>();
builder.Services.AddScoped<IReferenceService, ReferenceService>();

// 6. Swagger Configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 7. Aktifkan Swagger UI di Mode Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "CCMS Master Data API V1");
    });
}

// 8. Middleware Pipeline (Urutan harus sama dengan Student.API)
app.UseCors("AllowReact");
app.UseAuthorization();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();