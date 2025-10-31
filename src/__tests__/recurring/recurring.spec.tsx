import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen, waitFor } from '@testing-library/react';
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

describe('반복 일정 기능 - 반복 유형 선택', () => {
  it('일정 생성, 수정 시 반복 유형을 선택할 수 있다', async () => {
    const { user } = setup(<App />);
      
    const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
    await user.click(repeatCheckbox);

    expect(screen.getByRole('combobox', { name: /반복 유형/i })).toBeInTheDocument();
  });

  it("반복 유형 선택 컨트롤에서 매일을 선택할 수 있어야 한다", async () => {
    // [RED]
    // Given: 반복 유형 선택 컨트롤이 표시된 상태
    const { user } = setup(<App />);
    
    // 반복 일정 활성화
    const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
    await user.click(repeatCheckbox);
    
    // When: 반복 유형 Select를 클릭
    await waitFor(() => {
      const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
      expect(repeatTypeSelect).toBeInTheDocument();
    });
    
    const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
    await user.click(repeatTypeSelect);
    
    // 매일 옵션을 클릭
    const dailyOption = screen.getByRole('option', { name: /매일/i });
    await user.click(dailyOption);
    
    // Then: 매일 옵션이 선택 상태가 되어야 함
    await waitFor(() => {
      expect(repeatTypeSelect).toHaveTextContent(/매일/i);
    });
  });

  it("반복 유형 선택 컨트롤에서 매주를 선택할 수 있어야 한다", async () => {
    // [RED]
    // Given: 반복 유형 선택 컨트롤이 표시된 상태
    const { user } = setup(<App />);
    
    // 반복 일정 활성화
    const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
    await user.click(repeatCheckbox);
    
    // When: 반복 유형 Select를 클릭
    await waitFor(() => {
      const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
      expect(repeatTypeSelect).toBeInTheDocument();
    });
    
    const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
    await user.click(repeatTypeSelect);
    
    // 매주 옵션을 클릭
    const weeklyOption = screen.getByRole('option', { name: /매주/i });
    await user.click(weeklyOption);
    
    // Then: 매주 옵션이 선택 상태가 되어야 함
    await waitFor(() => {
      expect(repeatTypeSelect).toHaveTextContent(/매주/i);
    });
  });

  it("반복 유형 선택 컨트롤에서 매월을 선택할 수 있어야 한다", async () => {
    // [RED]
    // Given: 반복 유형 선택 컨트롤이 표시된 상태
    const { user } = setup(<App />);
    
    // 반복 일정 활성화
    const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
    await user.click(repeatCheckbox);
    
    // When: 반복 유형 Select를 클릭
    await waitFor(() => {
      const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
      expect(repeatTypeSelect).toBeInTheDocument();
    });
    
    const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
    await user.click(repeatTypeSelect);
    
    // 매월 옵션을 클릭
    const monthlyOption = screen.getByRole('option', { name: /매월/i });
    await user.click(monthlyOption);
    
    // Then: 매월 옵션이 선택 상태가 되어야 함
    await waitFor(() => {
      expect(repeatTypeSelect).toHaveTextContent(/매월/i);
    });
  });

  it("반복 유형 선택 컨트롤에서 매년을 선택할 수 있어야 한다", async () => {
    // [RED]
    // Given: 반복 유형 선택 컨트롤이 표시된 상태
    const { user } = setup(<App />);
    
    // 반복 일정 활성화
    const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
    await user.click(repeatCheckbox);
    
    // When: 반복 유형 Select를 클릭
    await waitFor(() => {
      const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
      expect(repeatTypeSelect).toBeInTheDocument();
    });
    
    const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
    await user.click(repeatTypeSelect);
    
    // 매년 옵션을 클릭
    const yearlyOption = screen.getByRole('option', { name: /매년/i });
    await user.click(yearlyOption);
    
    // Then: 매년 옵션이 선택 상태가 되어야 함
    await waitFor(() => {
      expect(repeatTypeSelect).toHaveTextContent(/매년/i);
    });
  });
});

describe('매월 31일 선택 규칙', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('31일에 매월을 선택하면 31일에만 생성된다 (월말이 아닌 31일 고정)', async () => {
    // Given: Mock handler 설정
    const mockEvents: Event[] = [];

    server.use(
      http.get('/api/events', () => {
        return HttpResponse.json({ events: mockEvents });
      }),
      http.post('/api/events-list', async ({ request }) => {
        const body = (await request.json()) as { events: Event[] };
        mockEvents.push(...body.events);
        return HttpResponse.json({ events: body.events }, { status: 201 });
      })
    );

    const { user } = setup(<App />);
    
    // 로딩 완료 대기
    await screen.findByText('일정 로딩 완료!');
    
    // 일정 정보 입력
    const titleInput = screen.getByLabelText('제목');
    await user.type(titleInput, '월말 회의');
    
    const dateInput = screen.getByLabelText('날짜');
    await user.clear(dateInput);
    await user.type(dateInput, '2025-01-31');
    
    const startTimeInput = screen.getByLabelText('시작 시간');
    await user.clear(startTimeInput);
    await user.type(startTimeInput, '10:00');
    
    const endTimeInput = screen.getByLabelText('종료 시간');
    await user.clear(endTimeInput);
    await user.type(endTimeInput, '11:00');
    
    // 반복 일정 활성화
    const repeatCheckbox = screen.getByRole('checkbox', { name: '반복 일정' });
    await user.click(repeatCheckbox);
    
    // 반복 유형 선택 - 매월
    const repeatTypeSelect = screen.getByRole('combobox', { name: /반복 유형/i });
    await user.click(repeatTypeSelect);
    const monthlyOption = screen.getByRole('option', { name: /매월/i });
    await user.click(monthlyOption);
    
    // 반복 종료일 설정 - 5월 31일 (3개월 동안 1월, 3월, 5월)
    const endDateInput = screen.getByLabelText(/반복 종료일/i);
    await user.clear(endDateInput);
    await user.type(endDateInput, '2025-05-31');
    
    // When: 추가 버튼 클릭
    const addButton = screen.getByRole('button', { name: /추가/i });
    await user.click(addButton);
    
    // Then: 성공 메시지 확인
    await screen.findByText(/일정이 추가되었습니다/i);
    
    // 일정이 실제로 생성되었는지 확인 - mockEvents에 3개의 일정이 있어야 함
    expect(mockEvents.length).toBe(3);
    
    // 각 일정의 날짜 검증
    const dates = mockEvents.map(e => e.date).sort();
    expect(dates).toEqual(['2025-01-31', '2025-03-31', '2025-05-31']);
    
    // 모든 일정이 "월말 회의" 제목을 가져야 함
    expect(mockEvents.every(e => e.title === '월말 회의')).toBe(true);
  });
});



// describe('반복 일정 기능 - 반복 유형 선택 (예외 규칙)', () => {
  
//   describe('매월 31일 선택', () => {
//     it('31일에 매월을 선택하면 31일에만 생성된다', async () => {
//       const { user } = setup(<App />);
      
//       // 일정 정보 입력
//       const titleInput = screen.getByLabelText('제목');
//       await user.type(titleInput, '월말 회의');
      
//       const dateInput = screen.getByLabelText('날짜');
//       await user.type(dateInput, '2025-01-31');
      
//       const startTimeInput = screen.getByLabelText('시작 시간');
//       await user.type(startTimeInput, '10:00');
      
//       const endTimeInput = screen.getByLabelText('종료 시간');
//       await user.type(endTimeInput, '11:00');
      
//       // 반복 설정 활성화
//       const repeatToggle = screen.getByRole('checkbox', { name: '반복 일정' });
//       await user.click(repeatToggle);
      
//       // 반복 유형 선택 - 매월 (DOM 업데이트 대기)
//       const repeatTypeSelect = await screen.findByTestId('repeat-type') as HTMLSelectElement;
//       fireEvent.change(repeatTypeSelect, { target: { value: 'monthly' } });
//       expect(repeatTypeSelect).toHaveValue('monthly');
      
//       // 저장
//       const submitButton = screen.getByTestId('event-submit-button');
//       await user.click(submitButton);
      
//       // 검증: 31일 일정이 생성되었는지 확인
//       // NOTE: 이 검증은 반복 일정 생성 로직 구현 후 실제 작동
//       // 예상: 2025년 1월, 3월, 5월 등의 31일에 "월말 회의" 일정 생성
//       expect(await screen.findByText('월말 회의')).toBeInTheDocument();
//     });
//   });

//   describe('윤년 29일 선택', () => {
//     it('윤년 2월 29일에 매년을 선택하면 2월 29일에만 생성된다', async () => {
//       const { user } = setup(<App />);
      
//       // 일정 정보 입력
//       const titleInput = screen.getByLabelText('제목');
//       await user.type(titleInput, '윤년 이벤트');
      
//       const dateInput = screen.getByLabelText('날짜');
//       await user.type(dateInput, '2024-02-29');
      
//       const startTimeInput = screen.getByLabelText('시작 시간');
//       await user.type(startTimeInput, '09:00');
      
//       const endTimeInput = screen.getByLabelText('종료 시간');
//       await user.type(endTimeInput, '10:00');
      
//       // 반복 설정 활성화
//       const repeatToggle = screen.getByRole('checkbox', { name: '반복 일정' });
//       await user.click(repeatToggle);
      
//       // 반복 유형 선택 - 매년 (DOM 업데이트 대기)
//       const repeatTypeSelect = await screen.findByTestId('repeat-type') as HTMLSelectElement;
//       fireEvent.change(repeatTypeSelect, { target: { value: 'yearly' } });
//       expect(repeatTypeSelect).toHaveValue('yearly');
      
//       // 저장
//       const submitButton = screen.getByTestId('event-submit-button');
//       await user.click(submitButton);
      
//       // 검증: 윤년 2월 29일 일정이 생성되었는지 확인
//       // NOTE: 이 검증은 반복 일정 생성 로직 구현 후 실제 작동
//       // 예상: 2024년 2월 29일, 2028년 2월 29일 등의 윤년에만 생성
//       // 평년 2월 28일에는 일정 미생성
//       expect(await screen.findByText('윤년 이벤트')).toBeInTheDocument();
//     });
//   });

// });
describe('윤년 29일 선택 규칙', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('윤년 2월 29일에 매년을 선택하면 29일에만 생성된다 (윤년에만)', async () => {
    // Given: Mock handler 설정
    // When: 추가 버튼 클릭 
    // Then: 성공 메시지 확인
  });
});


