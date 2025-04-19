<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_fetch_album_photos()
    {
        $response = $this->get('/api/album_photos');

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_fetch_accounts_master()
    {
        $response = $this->get('/api/chsone_accounts_master');

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_fetch_vendors()
    {
        $response = $this->get('/api/vendors');

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_create_vendor()
    {
        $response = $this->post('/api/vendors', [
            'name' => 'Vendor Name',
            'email' => 'vendor@example.com',
        ]);

        $response->assertStatus(201);
    }

    /** @test */
    public function it_can_update_vendor()
    {
        $vendor = Vendor::factory()->create();

        $response = $this->put("/api/vendors/{$vendor->id}", [
            'name' => 'Updated Vendor Name',
        ]);

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_delete_vendor()
    {
        $vendor = Vendor::factory()->create();

        $response = $this->delete("/api/vendors/{$vendor->id}");

        $response->assertStatus(200);
    }
}