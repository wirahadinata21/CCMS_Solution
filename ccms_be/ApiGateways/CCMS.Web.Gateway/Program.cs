using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Tambahkan file konfigurasi Ocelot
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Gunakan AddOcelot standar (Tanpa Handler yang menyebabkan error)
builder.Services.AddOcelot(builder.Configuration);

// Tambahkan CORS
builder.Services.AddCors(options => {
    options.AddPolicy("GatewayPolicy", policy => {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("GatewayPolicy");

await app.UseOcelot();

app.Run();