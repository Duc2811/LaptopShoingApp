declare module 'react-native-x-carousel' {
    import { ComponentType } from 'react';
    import { ViewProps } from 'react-native';

    interface CarouselProps extends ViewProps {
        data: any[];
        renderItem: (item: any, index: number) => React.ReactNode;
        loop?: boolean;
        pagingEnabled?: boolean;
        autoplay?: boolean;
        autoplayInterval?: number;
    }

    const Carousel: ComponentType<CarouselProps>;
    export default Carousel;
}
