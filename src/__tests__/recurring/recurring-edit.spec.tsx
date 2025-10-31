import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen, within, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';

import { server } from '../../setupTests';
import App from '../../App';
import { Event } from '../../types';

const theme = createTheme();

const setup = (element: ReactElement) => {
  const user = userEvent.setup();
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>{element}</SnackbarProvider>
      </ThemeProvider>
    ),
    user,
  };
};

describe('반복 일정 기능 - 반복 일정 수정', () => {
  describe('단일 수정 시나리오 ("예" 클릭)', () => {
    it('반복 일정 수정 모달에서 "예"를 클릭하면 해당 일정만 수정된다', async () => {
      // Given: 반복 일정이 존재하고 수정 대화상자가 열림

      // When: "해당 일정만 수정하시겠어요?" 모달에서 "예" 버튼 클릭

      // Then: 단일 일정만 수정되고, 반복 설정은 제거됨
    });

    it('반복 일정을 단일 수정하면 반복일정 아이콘이 사라진다', async () => {
      // Given: 반복 아이콘이 있는 반복 일정

      // When: 단일 수정("예") 완료
  
      // Then: 해당 일정의 반복일정 아이콘이 더 이상 렌더링되지 않음

    });

    it('반복 일정의 단일 수정 후 나머지 반복 일정은 유지된다', async () => {
      // Given: 반복 일정 시리즈 (예: 매주 월요일 3주)

      // When: 특정 인스턴스를 단일 수정("예")

      // Then: 수정된 일정만 단일로 변경되고, 나머지 반복 일정은 그대로 유지됨
    });
  });

  describe('전체 수정 시나리오 ("아니오" 클릭)', () => {
    it('반복 일정 수정 모달에서 "아니오"를 클릭하면 전체 반복 일정이 수정된다', async () => {
      // Given: 반복 일정이 존재하고 수정 대화상자가 열림

      // When: "해당 일정만 수정하시겠어요?" 모달에서 "아니오" 버튼 클릭

      // Then: 반복 설정이 변경되고, 반복 시리즈 전체에 적용됨
    });

    it('반복 일정을 전체 수정하면 반복일정 아이콘이 유지된다', async () => {
      // Given: 반복 아이콘이 있는 반복 일정

      // When: 전체 수정("아니오") 완료

      // Then: 반복일정 아이콘이 여전히 렌더링됨
    });
  });

  describe('에러 케이스', () => {
    it('반복 일정 수정 모달이 표시되지 않으면 단일/전체 수정 로직이 실행되지 않는다', async () => {
      // Given: 반복 일정이 존재하지만 수정 모달이 표시되지 않음

      // When: 수정 작업 시도하지 않음 (모달이 열리지 않음)

      // Then: 일정이 변경되지 않음 (모달이 없으므로 예/아니오 버튼도 없음)
    });
  });
});