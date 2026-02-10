import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

type HomepageSetting = {
    id?: number;
    title: string | null;
    heading: string | null;
    subheading: string | null;
    image_path: string | null;
} | null;

type Props = {
    setting: HomepageSetting;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Homepage Content',
        href: '/admin/homepage',
    },
];

export default function Homepage({ setting }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: setting?.title ?? 'Vehicle & Identity',
        heading: setting?.heading ?? 'Verification Portal',
        subheading:
            setting?.subheading ??
            'A secure, government-compliant platform for instant vehicle identity verification and documentation management.',
        image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/homepage', {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Homepage Content" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Homepage Content</h1>
                    <p className="text-muted-foreground">
                        Manage the hero section of the public homepage.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
                    <Card className="overflow-hidden">
                        <CardHeader>
                            <CardTitle>Hero Text</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="title">Title (first line)</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="heading">Heading (gradient line)</Label>
                                <Input
                                    id="heading"
                                    value={data.heading}
                                    onChange={(e) => setData('heading', e.target.value)}
                                />
                                {errors.heading && (
                                    <p className="text-sm text-destructive">{errors.heading}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="subheading">Subheading</Label>
                                <Textarea
                                    id="subheading"
                                    rows={4}
                                    value={data.subheading}
                                    onChange={(e) => setData('subheading', e.target.value)}
                                />
                                {errors.subheading && (
                                    <p className="text-sm text-destructive">{errors.subheading}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Hero Image</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="image">Upload image (optional)</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setData('image', e.target.files ? e.target.files[0] : null)
                                        }
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-destructive">{errors.image}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Recommended: wide image, up to 5MB.
                                    </p>
                                </div>

                                {setting?.image_path && (
                                    <div className="space-y-2">
                                        <Label>Current image</Label>
                                        <img
                                            src={`/storage/${setting.image_path}`}
                                            alt="Current hero"
                                            className="max-h-56 w-full rounded-lg border border-border/60 object-cover"
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Save changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

