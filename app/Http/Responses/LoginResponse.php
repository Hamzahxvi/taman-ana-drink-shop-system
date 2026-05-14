<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): Response
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            return $request->wantsJson()
                ? new JsonResponse('', 204)
                : redirect()->intended(route('admin.dashboard'));
        }

        return $request->wantsJson()
            ? new JsonResponse('', 204)
            : redirect()->intended(route('dashboard'));
    }
}
