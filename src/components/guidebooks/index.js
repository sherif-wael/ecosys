import React from "react";
import styled from "styled-components";
import AsyncContainer from "components/lib/AsyncContainer";
import GuidebooksTable from "./GuidebooksTable";
import GuidebookForm from "./GuidebookForm";
import { useGuidebooks, useCreateGuidebook } from "hooks/guidebooks";
import { useCreateTopic, useEditTopic, useTopics, useTopic } from "hooks/topics";
import { useTranslation } from "react-i18next";
import AdminHeader from "components/lib/AdminHeader";
import HeaderLink from "components/lib/HeaderLink";
import { useParams, useSearchParams } from "react-router-dom";
import TopicForm from "./TopicForm";
import GuidebookTopics from "./GuidebookTopics";
import { convertObjectToFormData } from "utils/helpers";

function Guidebooks(){
    const { data: guidebooks, ...state } = useGuidebooks();
    const { t } = useTranslation();

    return (
        <>
            <AdminHeader title={t("guidebooks")} />
            <HeaderLink href="/admin/guidebooks/create" label="Create Guidebook" />
            <Wrapper {...state}>
                {
                    guidebooks
                    &&
                    <GuidebooksTable guidebooks={guidebooks} />
                }
            </Wrapper>
        </>
    )
}

function Guidebook(){
    const { id } = useParams();
    const { data: topics, ...state } = useTopics(id);
    const { t } = useTranslation();
    console.log(topics);
    return (
        <>
            <AdminHeader title="topic" />

            <HeaderLink href={`/admin/topics/create/${id}`} label={t("createTopic")} />

            <Wrapper {...state}>
                {
                    topics
                    &&
                    <GuidebookTopics topics={topics} guidebookId={id} />
                }
            </Wrapper>
        </>
    )
}

function CreateGuidebook(){
    const { mutate: create, isLoading: isCreating } = useCreateGuidebook();
    const { t } = useTranslation();

    const initialGuidebookData = React.useMemo(
        () => ({
            name_en: "",
            name_ar: ""
        }),
        []
    );

    return (
        <>
            <AdminHeader title={t("createGuidebook")} />

            <GuidebookForm
                submit={guidebook => create(guidebook)}
                buttonLabel="Submit"
                isSubmitting={isCreating}
                initialGuidebookData={initialGuidebookData}
            />
        </>
    )
}

function CreateGuidebookTopic(){
    const { guidebook } = useParams();
    const { mutate: create, isLoading } = useCreateTopic(guidebook);


    const initialTopicData = {
        name_ar: "",
        name_en: "",
        description_en: "",
        description_ar: "",
        order: "",
        attachment: undefined,
        guidebook_id: guidebook
    };
    
    const handleSubmit = topic => {
        const formData = convertObjectToFormData(topic, ["attachment"]);
        create(formData);
    }

    return (
        <>
            <AdminHeader title="Add Topic" />

            <TopicForm
                buttonLabel="Submit"
                initialTopicData={initialTopicData}
                isSubmitting={isLoading}
                submit={handleSubmit}
            />
        </>
    )
}

function GuidebookTopic(){
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const guidebookId = searchParams.get("guidebook_id");
    const { t } = useTranslation();
    const { data: topic, ...state } = useTopic(id, guidebookId);
    const { mutate: edit, isLoading: isEditing } = useEditTopic(id, guidebookId);

    const handleSubmit = values => {
        values.guidebook_id = guidebookId;
        const formData = convertObjectToFormData(values, ["attachment"]);
        edit(formData);
    }

    return (
        <>
            <AdminHeader title={t("topic")} />

            <Wrapper {...state}>
                {
                    topic
                    &&
                    <TopicForm 
                        buttonLabel="Edit"
                        submit={handleSubmit}
                        initialTopicData={topic}
                        isSubmitting={isEditing}
                    />
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled(AsyncContainer)`
    &.loading{
        height: 200px;
    }
`;

export {
    Guidebook,
    Guidebooks,
    CreateGuidebook,
    CreateGuidebookTopic,
    GuidebookTopic
}