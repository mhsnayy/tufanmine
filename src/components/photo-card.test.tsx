import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PhotoCard } from './photo-card';

// Mock next/image since it requires specific Next.js environment
vi.mock('next/image', () => ({
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} priority={props.priority ? "true" : "false"} />;
  },
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, ...props }: any) => (
      <div onClick={onClick} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

describe('PhotoCard Component', () => {
  const mockPhoto = {
    id: 1,
    src: '/test-img.jpg',
    alt: 'Beautiful sunset',
    width: 800,
    height: 600,
  };

  it('renders the photo correctly', () => {
    const onClickMock = vi.fn();
    render(<PhotoCard photo={mockPhoto} onClick={onClickMock} />);

    const imageElement = screen.getByAltText('Beautiful sunset');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/test-img.jpg');
  });

  it('calls onClick handler with the photo object when clicked', () => {
    const onClickMock = vi.fn();
    render(<PhotoCard photo={mockPhoto} onClick={onClickMock} />);

    const cardElement = screen.getByTestId('motion-div');
    fireEvent.click(cardElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledWith(mockPhoto);
  });
});
