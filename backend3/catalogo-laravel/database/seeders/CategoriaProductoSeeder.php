<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;
use App\Models\Producto;

class CategoriaProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Crear categorías usando firstOrCreate
        $categorias = [
            ['nombre' => 'Electrónica', 'slug' => 'electronica'],
            ['nombre' => 'Ropa', 'slug' => 'ropa'],
            ['nombre' => 'Hogar', 'slug' => 'hogar'],
        ];

        foreach ($categorias as $catData) {
            Categoria::firstOrCreate(
                ['slug' => $catData['slug']],
                $catData
            );
        }

        // Crear productos
        $productos = [
            [
                'nombre' => 'Laptop X1',
                'descripcion' => 'Laptop de alto rendimiento',
                'precio' => 1200.50,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/proyecto-catalogo-laravel.firebasestorage.app/o/productos%2FLaptop%20X1.jpg?alt=media&token=861749a9-d7e7-479b-8312-93b5addab6ea',
                'stock' => 'disponible',
                'cantidad' => 10,
            ],
            [
                'nombre' => 'Camisa Casual',
                'descripcion' => 'Camisa de algodón',
                'precio' => 25.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/proyecto-catalogo-laravel.firebasestorage.app/o/productos%2FCamiza%20azul.jpg?alt=media&token=758012ed-d8eb-459f-a179-3ed565dc8063',
                'stock' => 'disponible',
                'cantidad' => 50,
            ],
            [
                'nombre' => 'Sofá Moderno',
                'descripcion' => 'Sofá de diseño cómodo',
                'precio' => 499.99,
                'imagen' => 'https://firebasestorage.googleapis.com/v0/b/proyecto-catalogo-laravel.firebasestorage.app/o/productos%2FSof%C3%A1%20Moderno.jpg?alt=media&token=2698a6a8-4b58-472c-a772-6260633d57ff',
                'stock' => 'disponible',
                'cantidad' => 5,
            ],
        ];

        foreach ($productos as $prodData) {
            $producto = Producto::firstOrCreate(
                ['nombre' => $prodData['nombre']],
                $prodData
            );

            // Asignar categorías aleatorias
            $categoriaIds = Categoria::inRandomOrder()->limit(rand(1, 2))->pluck('id')->toArray();
            $producto->categorias()->sync($categoriaIds);
        }
    }
}