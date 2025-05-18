import mockQuestions from "@/mocks/questions";
import { Answer, Question } from "@/types";
import { useEffect, useState } from "react";

export function useGetQuestions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    
    useEffect(() => {
        // Later, fetch questions here
        setQuestions(mockQuestions);
    }, [])
    
    return {
        questions
    }
}

// Later fetch the backend here
export function useGetCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const { questions } = useGetQuestions();

    useEffect(() => {
        const uniqueCategories = Array.from(
            new Set(questions.map((q) => q.category))
        );
        setCategories(uniqueCategories);
    }, [])

    return {
        categories,
    }
}

export function useGetNextQuestionId(currentQuestionId: string | null) {
    const { questions } = useGetQuestions();
    const [nextId, setNextId] = useState<string | null>(null);

    useEffect(() => {
        if (!questions.length) return;
        if (!currentQuestionId) {
            setNextId(questions[0].id);
        } else {
            const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
            const nextQuestion = questions[currentIndex + 1];
            setNextId(nextQuestion?.id || null);
        }
    }, [questions, currentQuestionId]);

    return { nextQuestionId: nextId };
}

// ✅ NEW HOOK: Post the selected answer
export function usePostAnswer() {
    const [status, setStatus] = useState<"idle" | "posting" | "success" | "error">("idle");

    const postAnswer = async (answer: Answer) => {
        setStatus("posting");
        try {
            // Replace this with an actual POST request later
            await new Promise((res) => setTimeout(res, 500));
            console.log("Answer posted:", answer);
            setStatus("success");
        } catch (err) {
            console.error("Failed to post answer", err);
            setStatus("error");
        }
    };

    return { postAnswer, status };
  }