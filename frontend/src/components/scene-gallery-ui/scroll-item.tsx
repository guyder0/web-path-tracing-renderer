import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

import { ImportScene, ConstructImageUrl } from "@/api/renderer-response";

export const ScrollCard = ({ title, hash }: { title:string, hash:string }) => {
    return (
    <Card className="relative overflow-hidden p-0 cursor-pointer transition-all duration-300 hover:scale-105"
        onClick={() => ImportScene(hash)}>
    <img
        src={ConstructImageUrl(hash)}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
    />
    <Badge className="absolute m-2" variant="secondary">{title}</Badge>
    </Card>
    )
}