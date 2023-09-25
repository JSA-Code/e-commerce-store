import { useState } from 'react';
import { Switch } from '@headlessui/react';

export function ToggleTheme() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      className={`${
        enabled ? 'bg-blue-600' : 'bg-gray-600'
      } relative mr-3 inline-flex h-6 w-11 flex-none items-center rounded-full`}
    >
      <span className="sr-only">Enable theme</span>
      <span
        className={`${
          enabled ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}
