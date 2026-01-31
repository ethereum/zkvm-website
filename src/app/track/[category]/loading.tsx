import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb skeleton */}
        <div className="mb-8">
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Header skeleton */}
        <div className="mb-12">
          <Skeleton className="mb-4 h-10 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="mt-4 h-6 w-32" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
