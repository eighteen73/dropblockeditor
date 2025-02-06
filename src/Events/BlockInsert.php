<?php

namespace Jeffreyvr\DropBlockEditor\Events;

use Illuminate\Foundation\Events\Dispatchable;

class BlockInsert
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(protected array $block = [])
    {
        //
    }

    public function setBlock(array $block): void
    {
        $this->block = $block;
    }

    public function getBlock(): array
    {
        return $this->block;
    }
}
