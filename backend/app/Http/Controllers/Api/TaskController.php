<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private function formatTask(Task $task): array
    {
        return [
            'id' => $task->id,
            'title' => $task->title,
            'label' => $task->label ?: 'ラベルなし',
            'status' => $task->status,
            'startDate' => $task->start_date?->format('Y-m-d'),
            'endDate' => $task->end_date?->format('Y-m-d'),
            'createdBy' => $task->created_by,
            'assignee' => $task->assignee,
            'completedAt' => $task->completed_at?->format('Y-m-d H:i'),
            'createdAt' => $task->created_at?->format('Y-m-d H:i:s'),
            'updatedAt' => $task->updated_at?->format('Y-m-d H:i:s'),
        ];
    }

    public function index()
    {
        $tasks = Task::orderByDesc('id')->get();

        return response()->json(
            $tasks->map(fn ($task) => $this->formatTask($task))
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'label' => ['nullable', 'string', 'max:255'],
            'startDate' => ['required', 'date'],
            'endDate' => ['required', 'date', 'after_or_equal:startDate'],
            'status' => ['nullable', 'in:TODO,DOING,DONE'],
            'createdBy' => ['nullable', 'string', 'max:255'],
            'assignee' => ['nullable', 'string', 'max:255'],
            'completedAt' => ['nullable', 'date'],
        ]);

        $task = Task::create([
            'title' => trim($validated['title']),
            'label' => trim($validated['label'] ?? '') ?: 'ラベルなし',
            'status' => $validated['status'] ?? 'TODO',
            'start_date' => $validated['startDate'],
            'end_date' => $validated['endDate'],
            'created_by' => $validated['createdBy'] ?? '朝倉悠翔',
            'assignee' => $validated['assignee'] ?? '朝倉悠翔',
            'completed_at' => $validated['completedAt'] ?? null,
        ]);

        return response()->json($this->formatTask($task), 201);
    }

    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'label' => ['nullable', 'string', 'max:255'],
            'startDate' => ['sometimes', 'required', 'date'],
            'endDate' => ['sometimes', 'required', 'date'],
            'status' => ['sometimes', 'required', 'in:TODO,DOING,DONE'],
            'createdBy' => ['nullable', 'string', 'max:255'],
            'assignee' => ['nullable', 'string', 'max:255'],
            'completedAt' => ['nullable', 'date'],
        ]);

        $startDate = $validated['startDate'] ?? $task->start_date?->format('Y-m-d');
        $endDate = $validated['endDate'] ?? $task->end_date?->format('Y-m-d');

        if ($startDate && $endDate && $startDate > $endDate) {
            return response()->json([
                'message' => '開始日は終了日より前の日付にしてください。'
            ], 422);
        }

        $nextStatus = $validated['status'] ?? $task->status;

        $task->update([
            'title' => array_key_exists('title', $validated)
                ? trim($validated['title'])
                : $task->title,
            'label' => array_key_exists('label', $validated)
                ? (trim($validated['label'] ?? '') ?: 'ラベルなし')
                : $task->label,
            'status' => $nextStatus,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'created_by' => $validated['createdBy'] ?? $task->created_by,
            'assignee' => $validated['assignee'] ?? $task->assignee,
            'completed_at' => array_key_exists('completedAt', $validated)
                ? $validated['completedAt']
                : (
                    $nextStatus === 'DONE' && !$task->completed_at
                        ? now()
                        : ($nextStatus !== 'DONE' ? null : $task->completed_at)
                ),
        ]);

        return response()->json($this->formatTask($task->fresh()));
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json([
            'ok' => true,
            'message' => '削除しました。',
        ]);
    }
}