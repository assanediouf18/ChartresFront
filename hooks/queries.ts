import mockQuestions from "@/mocks/questions";
import { Answer, Question } from "@/types";
import { useEffect, useState } from "react";

const base_url = process.env.EXPO_PUBLIC_API_URL;

export function useGetQuestions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    console.log(`${base_url}`);
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
    console.log(`${base_url}`);
    useEffect(() => {
        console.log(`${base_url}/categories`);
        fetch(`${base_url}/categories`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                setCategories(data.categories);
            })
            .catch(e => { console.log(e) });
    }, [])

    return {
        categories,
    }
}

export function useGetNextQuestion() {
    const [question, setQuestion] = useState<Question | undefined>();
    console.log(`${base_url}`);
    useEffect(() => {
        console.log(`${base_url}/question_next`);
        fetch(`${base_url}/question_next`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setQuestion(data);
            });
    }, []);

    return { question: question, };
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