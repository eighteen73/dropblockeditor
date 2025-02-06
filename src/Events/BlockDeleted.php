<?php

namespace Jeffreyvr\DropBlockEditor\Events;

use Illuminate\Foundation\Events\Dispatchable;

class BlockDeleted
{
    use Dispatchable;

    /**
     * Create a new event instance.
     */
    public function __construct(protected array $block = [])
    {
        //
    }

    public function getBlock(): array
    {
        return $this->block;
    }
}
