import React from "react"
import { useEffect, useState } from "react"
import { CloudCheck, CloudOff, Loader2, RefreshCw, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { CheckRenderer, CheckRepository } from "@/api/alive"
import { ServerUrlModal } from "@/components/server-url-modal"
import { useApiStore } from "@/api/store-config"


interface ComponentProps {
  status: 'loading' | 'online' | 'offline';
}

const StatusBadge: React.FC<ComponentProps> = ({ status }) => {
    return (
        <>
            {status === 'loading' && (
                <Badge variant="outline" className="gap-1 animate-pulse">
                <Loader2 className="h-3 w-3 animate-spin" /> Checking
                </Badge>
            )}
            {status === 'online' && (
                <Badge variant="outline" className="gap-1 border-emerald-500/50 text-emerald-500 bg-emerald-500/5">
                <CloudCheck className="h-3 w-3" /> Live
                </Badge>
            )}
            {status === 'offline' && (
                <Badge variant="destructive" className="gap-1">
                <CloudOff className="h-3 w-3" /> Disconnected
                </Badge>
            )}
        </>
    )
}

export const ServerStatus = () => {
  const [statusRend, setStatusRend] = useState<'loading' | 'online' | 'offline'>('offline');
  const [statusRepo, setStatusRepo] = useState<'loading' | 'online' | 'offline'>('offline');
  const [showUrlModal, setShowUrlModal] = useState(false);

  const { backendApiUrl, setBackendApiUrl } = useApiStore();

  // Проверка статуса серверов
  useEffect(() => {
    CheckRenderer((is_alive) => setStatusRend(is_alive ? 'online' : 'offline'));
    CheckRepository((is_alive) => setStatusRepo(is_alive ? 'online' : 'offline'));
  }, []);

  const handleRefresh = () => {
    setStatusRend('loading');
    setStatusRepo('loading');

    // Небольшая задержка для красивой анимации
    setTimeout(() => {
      CheckRenderer((is_alive) => setStatusRend(is_alive ? 'online' : 'offline'));
      CheckRepository((is_alive) => setStatusRepo(is_alive ? 'online' : 'offline'));
    }, 300);
  };

  const handleSaveUrl = (newUrl: string) => {
    setBackendApiUrl(newUrl);
    handleRefresh();
  };

  return (
    <>
      <div className="flex items-center gap-2 px-3 py-1 border-l ml-4">
        {/* Клик по "Рендерер" открывает модалку */}
        <span
          className="text-[10px] uppercase font-bold tracking-widest hover:cursor-pointer hover:text-blue-400 transition-colors flex items-center gap-1"
          onClick={() => setShowUrlModal(true)}
        >
          Рендерер
          <Settings className="h-3 w-3 opacity-60" />
        </span>

        <StatusBadge status={statusRend} />

        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
          Репозиторий
        </span>
        <StatusBadge status={statusRepo} />

        {statusRend !== 'loading' && statusRepo !== 'loading' && (
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="icon"
            className="h-7 w-7"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Модальное окно */}
      <ServerUrlModal
        isOpen={showUrlModal}
        currentUrl={backendApiUrl}
        onClose={() => setShowUrlModal(false)}
        onSave={handleSaveUrl}
      />
    </>
  );
};