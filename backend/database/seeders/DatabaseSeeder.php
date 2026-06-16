<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Usuário admin padrão — mude a senha antes de ir para produção!
        User::firstOrCreate(
            ['email' => 'equipe@escolacda.com.br'],
            [
                'name'     => 'Equipe CDA',
                'password' => Hash::make('cda@2025'),
            ]
        );

        // Configurações padrão do site
        $defaults = [
            'whatsapp'  => '(55) 3217-7947',
            'telefone'  => '(55) 3217-7947',
            'wpp_link'  => 'https://wa.me/555532177947',
            'endereco'  => 'R. José Manhago, 194 - Camobi, Santa Maria - RS',
            'horario'   => 'Segunda a Sexta, 7h às 18h',
            'instagram' => '@escolacda.sm',
            'facebook'  => '/escolacda.sm',
        ];

        foreach ($defaults as $chave => $valor) {
            Setting::firstOrCreate(['chave' => $chave], ['valor' => $valor]);
        }
    }
}
