import React from "react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CloudCheck, CloudOff, Loader2 } from "lucide-react"

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
  const [statusRend, setStatusRend] = useState<'loading' | 'online' | 'offline'>('loading')
  const [statusRepo, setStatusRepo] = useState<'loading' | 'online' | 'offline'>('loading')

  useEffect(() => {
    const check = setInterval(() => {
      setStatusRend(Math.random() > 0.5 ? 'online' : 'offline')
    }, 5000)
  }, [])

  return (
    <div className="flex items-center gap-2 px-3 py-1 border-l ml-4">
      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
        Рендерер
      </span>
      <StatusBadge status={statusRend}/>
      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
        Репозиторий
      </span>
      <StatusBadge status={statusRepo}/>
    </div>
  )
}