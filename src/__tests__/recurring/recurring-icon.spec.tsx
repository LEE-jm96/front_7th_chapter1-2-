import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';

import App from '../../App';

const theme = createTheme();

const setup = (element: ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>{element}</SnackbarProvider>
    </ThemeProvider>
  );
};

describe('캘린더 뷰 - 반복 일정 아이콘 표시', () => {
  describe('반복 일정 아이콘 노출', () => {
    it('반복 일정 옆에 아이콘이 표시된다', () => {
      // 테스트 설계:
      // 1. 반복 일정(repeat.type !== 'none')을 포함하는 이벤트가 화면에 표시될 때
      // 2. 일정 제목 옆에 반복을 나타내는 아이콘이 노출되어야 함
      // 예: Repeat, Autorenew, Event 등의 아이콘
    });

    it('반복하지 않는 일정에는 아이콘이 없다', () => {
      // 테스트 설계:
      // 1. 반복 설정이 없는 일정(repeat.type === 'none')이 표시될 때
      // 2. 해당 일정 옆에 반복 아이콘이 노출되지 않아야 함
    });
  });

  describe('다양한 반복 유형별 아이콘 표시', () => {
    it('일간 반복(daily) 일정에 아이콘이 표시된다', () => {
      // 테스트 설계:
      // 1. repeat.type이 'daily'인 이벤트가 표시될 때
      // 2. 해당 일정 옆에 반복 아이콘이 노출되어야 함
    });

    it('주간 반복(weekly) 일정에 아이콘이 표시된다', () => {
      // 테스트 설계:
      // 1. repeat.type이 'weekly'인 이벤트가 표시될 때
      // 2. 해당 일정 옆에 반복 아이콘이 노출되어야 함
    });

    it('월간 반복(monthly) 일정에 아이콘이 표시된다', () => {
      // 테스트 설계:
      // 1. repeat.type이 'monthly'인 이벤트가 표시될 때
      // 2. 해당 일정 옆에 반복 아이콘이 노출되어야 함
    });

    it('연간 반복(yearly) 일정에 아이콘이 표시된다', () => {
      // 테스트 설계:
      // 1. repeat.type이 'yearly'인 이벤트가 표시될 때
      // 2. 해당 일정 옆에 반복 아이콘이 노출되어야 함
    });
  });

  describe('아이콘 표시 위치 및 배치', () => {
    it('아이콘이 일정 제목 앞에 표시된다', () => {
      // 테스트 설계:
      // 1. 반복 일정이 표시될 때
      // 2. 아이콘이 일정 제목 앞(또는 좌측)에 위치해야 함
      // 3. 아이콘과 제목 사이에 적절한 간격(spacing)이 있어야 함
    });

    it('여러 반복 일정이 함께 표시될 때 각각 아이콘이 표시된다', () => {
      // 테스트 설계:
      // 1. 반복 일정 여러 개가 캘린더 뷰에 표시될 때
      // 2. 각 일정 옆에 모두 반복 아이콘이 노출되어야 함
    });
  });
});
