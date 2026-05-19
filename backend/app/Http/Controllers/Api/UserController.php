<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    private array $roles = [
        'USER',
        'STAFF',
        'MANAGER',
        'ADMIN',
    ];

    public function index(): JsonResponse
    {
        $users = User::query()
            ->orderByDesc('id')
            ->get()
            ->map(fn (User $user) => $this->formatUser($user))
            ->values();

        return response()->json($users);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'role' => ['nullable', 'string', Rule::in($this->roles)],
        ]);

        $user = User::create([
            'name' => trim($validated['name']),
            'email' => trim($validated['email']),
            'role' => $validated['role'] ?? 'USER',

            // 今回は本格ログインをしない簡易版なので仮パスワード
            'password' => Hash::make('password'),
        ]);

        return response()->json($this->formatUser($user), 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($this->formatUser($user));
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => [
                'sometimes',
                'required',
                'email',
                'max:255',
                Rule::unique('users', 'email')->ignore($user->id),
            ],
            'role' => ['sometimes', 'required', 'string', Rule::in($this->roles)],
        ]);

        $user->update([
            'name' => array_key_exists('name', $validated)
                ? trim($validated['name'])
                : $user->name,

            'email' => array_key_exists('email', $validated)
                ? trim($validated['email'])
                : $user->email,

            'role' => array_key_exists('role', $validated)
                ? $validated['role']
                : $user->role,
        ]);

        return response()->json($this->formatUser($user->fresh()));
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return response()->json([
            'ok' => true,
        ]);
    }

    private function formatUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role ?? 'USER',
            'roleLabel' => $this->getRoleLabel($user->role ?? 'USER'),
            'createdAt' => optional($user->created_at)->toISOString(),
            'updatedAt' => optional($user->updated_at)->toISOString(),
        ];
    }

    private function getRoleLabel(string $role): string
    {
        return match ($role) {
            'STAFF' => '所員',
            'MANAGER' => '所長',
            'ADMIN' => '管理者',
            default => '利用者',
        };
    }
}