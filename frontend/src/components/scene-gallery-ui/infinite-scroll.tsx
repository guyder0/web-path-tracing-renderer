import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { ScrollCard } from "@/components/scene-gallery-ui/scroll-item";
import { GetScenes } from "@/api/renderer-response";

interface Item {
  title: string;
  hash: string;
}

export const InfiniteScroll = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Реф для отслеживания последнего элемента (сенсор прокрутки)
    const observerTarget = useRef<HTMLDivElement>(null);

    // Функция загрузки данных
    const fetchItems = async (currentPage: number) => {
        if (loading) return;
        setLoading(true);

        try {
        const response = await GetScenes(currentPage);
        const data = await response.data;

        console.log(data)

        if (data.length === 0) {
            setHasMore(false);
        } else {
            setItems((prev) => [...prev, ...data]);
        }
        } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        setHasMore(false)
        } finally {
        setLoading(false);
        }
    }

  // Эффект для первоначальной загрузки и загрузки при смене страницы
  useEffect(() => {
    fetchItems(page);
  }, [page]);

  // Настройка Intersection Observer для бесконечного скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Если "сенсор" внизу экрана появился в зоне видимости и есть что грузить
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const handleManualLoad = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-6">Галлерея сцен</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => <ScrollCard key={item.hash} title={item.title} hash={item.hash}/>)}
      </div>

      <div ref={observerTarget} className="h-10 w-full" />

      <div className="flex flex-col items-center mt-8 pb-10">
        {hasMore ? (
          <Button
            onClick={handleManualLoad}
            disabled={loading}
            variant="outline"
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка...
              </>
            ) : (
              "Загрузить еще"
            )}
          </Button>
        ) : (
          <p className="text-muted-foreground">Не удалось загрузить больше сцен</p>
        )}
      </div>
    </div>
  );
};